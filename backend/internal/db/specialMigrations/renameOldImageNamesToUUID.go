package specialMigrations

import (
	"context"
	"errors"
	"fmt"
	"github.com/georgysavva/scany/pgxscan"
	"github.com/jackc/pgx/v4/pgxpool"
	common2 "github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"log"
	"os"
	"strings"
)

type OldImage struct {
	ID   uint64
	Name string
}

var imageNameUpdateNecessaryMigration uint64 = 20210627124019

func PrepareImageNameUpgrade(db *pgxpool.Pool, ctx *context.Context) ([]*OldImage, error) {
	migrationVersions, err := getMigrationVersions(db, ctx)
	if err != nil {
		if strings.Contains(err.Error(), `relation "schema_migrations" does not exist`) {
			return nil, nil
		}
		return nil, err
	}

	for _, ver := range migrationVersions {
		if ver.Version >= imageNameUpdateNecessaryMigration {
			return nil, nil
		}
	}

	images, err := getAllOldImages(db, ctx)

	return images, err
}

func PerformSpecialMigration(db *pgxpool.Pool, ctx *context.Context, oldImages []*OldImage) error {
	migratedImages, err := getAllImages(db, ctx)
	if err != nil {
		return err
	}

	if len(migratedImages) != len(oldImages) {
		return errors.New("number of images differs from before migration")
	}

	oldToNewImageMap := make(map[OldImage]tables.Image)
	for index, image := range oldImages {
		oldToNewImageMap[*image] = *migratedImages[index]
	}

	basePath := common2.GetEnvVars().ImageFolder
	for oldImg, newImg := range oldToNewImageMap {
		path := fmt.Sprintf("%s/%s", basePath, oldImg.Name)
		_, err := os.Stat(path)
		if err == nil {
			// The image has a name, not dependent on its id, ignore it.
			continue
		}

		path = fmt.Sprintf("%s/%d_%s", basePath, oldImg.ID, oldImg.Name)
		newPath := fmt.Sprintf("%s/%s_%s", basePath, newImg.ID, newImg.Name)
		log.Printf("Renaming '%s' -> '%s'", path, newPath)
		err = os.Rename(path, newPath)
		if err != nil {
			return err
		}
	}
	return nil
}

var getAllOldImagesQuery = `SELECT id, name FROM image`

// Used for migration purposes only
func getAllOldImages(db *pgxpool.Pool, ctx *context.Context) ([]*OldImage, error) {
	var images []*OldImage
	err := pgxscan.Select(*ctx, db, &images, getAllOldImagesQuery)

	return images, err
}

var getAllImagesQuery = `SELECT id, name FROM image WHERE name != '010-somedumbtext-020'`

func getAllImages(db *pgxpool.Pool, ctx *context.Context) ([]*tables.Image, error) {
	var images []*tables.Image

	err := pgxscan.Select(*ctx, db, &images, getAllImagesQuery)

	return images, err
}

var getMigrationVersionsQuery = `SELECT version FROM schema_migrations`

func getMigrationVersions(db *pgxpool.Pool, ctx *context.Context) ([]*schemaMigration, error) {

	var migrations []*schemaMigration
	err := pgxscan.Select(*ctx, db, &migrations, getMigrationVersionsQuery)

	return migrations, err
}

type schemaMigration struct {
	Version uint64
}
