import { useEffect, useState } from "react";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import fuzzysort from "fuzzysort";

import { useTranslations } from "../../../hooks/useTranslations";
import { IconButton } from "../Buttons/Buttons";
import Checkbox from "../Checkbox/Checkbox";
import Dropdown from "../Dropdown/Dropdown";
import Loading from "../Loading";
import TextField from "../TextField/TextField";

import styles from "./DataTable.module.scss";

interface DataTableVal {
  id: string;
}

type DataTableHeaderProp = {
  // Must be a number between 0 - 90 with the total sum of all widths being 90
  width: number;
  columnName: string;
  align: "Left" | "Right" | "Center";
};

type DataTableProps<T extends DataTableVal> = {
  searchPlaceholder: string;
  vals: T[];
  header: DataTableHeaderProp[];
  getRowVals: (val: T) => string[];
  selectedVals: T[];
  setSelectedVals: (vals: T[]) => void;
  searchKeys: string[];
};

const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

const DataTable = <T extends DataTableVal>({
  searchPlaceholder,
  vals,
  header,
  getRowVals,
  selectedVals,
  setSelectedVals,
  searchKeys,
}: DataTableProps<T>) => {
  const { t } = useTranslations();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [totalPages, setTotalPages] = useState(1);
  const [currPageVals, setCurrPageVals] = useState<T[]>([]);

  const [filterText, setFilterText] = useState("");
  const [filteredVals, setFilteredVals] = useState(vals);

  const [initialized, setInitialized] = useState(false);

  const pageSizeOptions = PAGE_SIZE_OPTIONS.map((n) => {
    return {
      display: `${n} ${t.dataTable.perPage}`,
      value: `${n}`,
    };
  });

  useEffect(() => {
    setInitialized(true);

    const res = fuzzysort.go(filterText, vals, {
      keys: searchKeys,
      all: true,
    });

    setFilteredVals(res.map((v) => v.obj));
  }, [filterText, vals, searchKeys]);

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredVals.length / pageSize);
    setTotalPages(newTotalPages);
    let newPage = page;
    if (newPage >= newTotalPages) {
      newPage = Math.max(newTotalPages - 1, 0);
      setPage(newPage);
    }

    setCurrPageVals(getValPage(filteredVals, newPage, pageSize));
  }, [filteredVals, pageSize, page]);

  if (!initialized) {
    return <Loading />;
  }

  return (
    <div className={styles.dataTableContainer}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th colSpan={3}>
              <TextField
                variant="outlined"
                placeholder={searchPlaceholder}
                type="search"
                className={"marginRight marginLeft"}
                onChange={(e) => {
                  setFilterText(e.target.value);
                }}
              />
            </th>
          </tr>
          <tr>
            <th style={{ width: "10%" }} className={styles.alignCenter} />
            {header.map(({ width, columnName, align }) => (
              <th
                key={columnName}
                style={{ width: `${width}%` }}
                className={styles[`align${align}`]}
              >
                {columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currPageVals.map((val) => (
            <tr key={val.id}>
              <td className={styles.alignCenter}>
                <div className={styles.center}>
                  <Checkbox
                    checked={
                      selectedVals.filter((v) => v.id === val.id).length > 0
                    }
                    setChecked={(checked) => {
                      if (checked) {
                        setSelectedVals([...selectedVals, val]);
                      } else {
                        setSelectedVals(selectedVals.filter((v) => v !== val));
                      }
                    }}
                  />
                </div>
              </td>

              {getRowVals(val).map((col, index) => (
                <td
                  key={index}
                  className={styles[`align${header[index].align}`]}
                >
                  {col}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              <div className={styles.footerContainer}>
                {`${selectedVals.length}/${vals.length} ${t.dataTable.selected}`}
                <Dropdown
                  options={pageSizeOptions}
                  onUpdate={(val) => {
                    const newPageSize = parseInt(val);
                    setPageSize(newPageSize);
                  }}
                  defaultValue={`${DEFAULT_PAGE_SIZE}`}
                  visibleSize={"auto"}
                  variant={"opaque"}
                />
                <div>
                  <IconButton
                    variant="opaque"
                    size="small"
                    icon={faChevronLeft}
                    type="button"
                    disabled={page === 0}
                    onClick={() => {
                      setPage(page - 1);
                    }}
                  />
                  {`${t.dataTable.page} ${totalPages === 0 ? 0 : page + 1} ${
                    t.dataTable.outOf
                  } ${totalPages}`}
                  <IconButton
                    variant="opaque"
                    size="small"
                    icon={faChevronRight}
                    type="button"
                    disabled={page + 1 >= totalPages}
                    onClick={() => {
                      setPage(page + 1);
                    }}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

function getValPage<T>(vals: T[], page: number, pageSize: number): T[] {
  const startIndex = page * pageSize;
  if (vals.length === 0 || startIndex > vals.length) {
    return [];
  }

  let endIndex = startIndex + pageSize;
  if (endIndex >= vals.length) {
    endIndex = vals.length - 1;
  }

  const pageVals = [];
  for (let i = startIndex; i <= endIndex; i++) {
    pageVals.push(vals[i]);
  }

  return pageVals;
}

export default DataTable;
