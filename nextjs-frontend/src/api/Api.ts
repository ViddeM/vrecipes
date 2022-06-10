import axios, { AxiosResponse } from "axios";
import { ShortRecipe } from "./ShortRecipe";
import { Recipe } from "./Recipe";
import { IMAGE_BASE_ENDPOINT, TAGS_BASE_ENDPOINT } from "./Endpoints";
import { Me } from "./Me";
import { UniqueName } from "./UniqueName";
import { Image } from "./Image";
import { Tag } from "./Tag";
import { NewTag } from "./NewTag";

// FIXME: should be changed before prod...
axios.defaults.baseURL = "http://localhost:3000/api";

interface RawApiResponse<ResponseData> {
  success: boolean;
  error: string | null;
  data: ResponseData | null;
}

export const Api = {
  recipes: {
    getAll: () => {
      return handleResponse(
        axios.get<RawApiResponse<{ recipes: ShortRecipe[] }>>("/recipes"),
        false
      );
    },
    getOne: (unique_name: string) => {
      return handleResponse(
        axios.get<RawApiResponse<Recipe>>(`/recipes/${unique_name}`),
        false
      );
    },
    create: (name: string) => {
      return handleResponse(
        axios.post<RawApiResponse<UniqueName>>("/recipes", {
          name: name,
        }),
        true
      );
    },
    remove: (id: string) => {
      return handleResponse(
        axios.delete<RawApiResponse<string>>(`/recipes/${id}`),
        true
      );
    },
    edit: (recipe: Recipe) => {
      return handleResponse(
        axios.put<RawApiResponse<Recipe>>(`/recipes/${recipe.id}`, recipe),
        true
      );
    },
  },
  user: {
    githubLogin: () => {
      return handleResponse(axios.get("/auth/github"), true);
    },
    logout: () => {
      return handleResponse(axios.post("/auth/logout"), false);
    },
    getMe: () => {
      return handleResponse(axios.get<RawApiResponse<Me>>("/me"), false);
    },
  },
  tags: {
    getAll: () => {
      return handleResponse(
        axios.get<RawApiResponse<{ tags: Tag[] }>>(TAGS_BASE_ENDPOINT),
        false
      );
    },
    create: (tag: NewTag) => {
      return handleResponse(
        axios.post<RawApiResponse<NewTag>>(TAGS_BASE_ENDPOINT, tag),
        true
      );
    },
    remove: (id: string) => {
      return handleResponse(
        axios.delete<RawApiResponse<string>>(`${TAGS_BASE_ENDPOINT}/${id}`),
        true
      );
    },
    edit: (tag: Tag) => {
      return handleResponse(
        axios.put<RawApiResponse<Tag>>(`${TAGS_BASE_ENDPOINT}/${tag.id}`, tag),
        true
      );
    },
  },
  images: {
    formatImageUrl: (imageUrl: string): string => {
      return `${IMAGE_BASE_ENDPOINT}/${imageUrl}`;
    },
    upload: (file: File) => {
      const data = new FormData();
      data.append("file", file);
      return handleResponse(
        axios.put<RawApiResponse<Image>>("/images", data),
        true
      );
    },
  },
};

export interface ApiResponse<T> {
  errorTranslationString?: string;
  error?: boolean;
  data?: T;
  rawResponse: AxiosResponse<RawApiResponse<T>>;
}

function handleResponse<T>(
  response: Promise<AxiosResponse<RawApiResponse<T>, any>>,
  handleAuth: boolean
): Promise<ApiResponse<T>> {
  return response
    .then((responseData) => {
      let data = responseData.data;
      if (!data.success || data.error || !data.data) {
        return {
          error: true,
          errorTranslationString: handleError(data),
          rawResponse: responseData,
        };
      }

      return {
        data: data.data,
        rawResponse: responseData,
      };
    })
    .catch((err) => {
      let error = "errors.default";

      if (handleAuth && err.response.status === 401) {
        // We need to get authorized.
        if (err.response.headers.location) {
          // The server provided us with an authorization URL.
          window.location.assign(err.response.headers.location);
          return { rawResponse: err.response };
        } else {
          error = "errors.unauthorized";
        }
      } else if (err.response && err.response.data) {
        error = handleError(err.response.data);
      }

      return {
        error: true,
        errorTranslationString: error,
        rawResponse: err.response,
      };
    });
}

function handleError<T>(data: RawApiResponse<T>): string {
  let error = data.error;
  if (!error) {
    error = "default";
  }

  return `errors.${error}`;
}

export function isClientSide(): boolean {
  return typeof document !== "undefined";
}
