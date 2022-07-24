import axios, { AxiosResponse } from "axios";
import encodeurl from "encodeurl";

import { Author } from "./Author";
import { EditRecipe } from "./EditRecipe";
import { EditRecipeBook } from "./EditRecipeBook";
import { IMAGE_BASE_ENDPOINT, TAGS_BASE_ENDPOINT } from "./Endpoints";
import { Image } from "./Image";
import { Me } from "./Me";
import { NewTag } from "./NewTag";
import { Recipe } from "./Recipe";
import { RecipeBook } from "./RecipeBook";
import { ShortRecipe } from "./ShortRecipe";
import { ShortRecipeBook } from "./ShortRecipeBook";
import { Tag } from "./Tag";
import { UniqueName } from "./UniqueName";

let baseUrl = "/api";
if (typeof window === "undefined") {
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "/api";
}

axios.defaults.baseURL = baseUrl;

const imageBaseUrl = baseUrl;

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.url = encodeurl(config.url ?? "");
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

interface RawApiResponse<ResponseData> {
  success: boolean;
  error: string | null;
  data: ResponseData | null;
}

export const Api = {
  authors: {
    getAll: () => {
      return handleResponse(
        axios.get<RawApiResponse<{ authors: Author[] }>>("/authors"),
        false
      );
    },
  },
  recipes: {
    getAll: () => {
      return handleResponse(
        axios.get<RawApiResponse<{ recipes: ShortRecipe[] }>>("/recipes"),
        false
      );
    },
    getOne: (uniqueName: string) => {
      return handleResponse(
        axios.get<RawApiResponse<Recipe>>(`/recipes/${uniqueName}`),
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
    edit: (recipe: EditRecipe) => {
      return handleResponse(
        axios.put<RawApiResponse<UniqueName>>(`/recipes/${recipe.id}`, recipe),
        true
      );
    },
  },
  recipeBooks: {
    getAll: () => {
      return handleResponse(
        axios.get<RawApiResponse<{ recipeBooks: ShortRecipeBook[] }>>("/books"),
        false
      );
    },
    getOne: (uniqueName: string) => {
      return handleResponse(
        axios.get<RawApiResponse<RecipeBook>>(`/books/${uniqueName}`),
        false
      );
    },
    create: (name: string) => {
      return handleResponse(
        axios.post<RawApiResponse<UniqueName>>("/books", {
          name: name,
        }),
        true
      );
    },
    edit: (id: string, recipeBook: EditRecipeBook) => {
      return handleResponse(
        axios.put<RawApiResponse<UniqueName>>(`/books/${id}`, recipeBook),
        true
      );
    },
    remove: (id: string) => {
      return handleResponse(
        axios.delete<RawApiResponse<string>>(`/books/${id}`),
        true
      );
    },
  },
  user: {
    githubLogin: () => {
      return handleResponse(axios.get("/auth/github"), true);
    },
    microsoftLogin: () => {
      return handleResponse(axios.get("/auth/microsoft"), true);
    },
    facebookLogin: () => {
      return handleResponse(axios.get("/auth/facebook"), true);
    },
    googleLogin: () => {
      return handleResponse(axios.get("/auth/google"), true);
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
        axios.post<RawApiResponse<string>>(TAGS_BASE_ENDPOINT, tag),
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
      return `${imageBaseUrl}${IMAGE_BASE_ENDPOINT}/${imageUrl}`;
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
      const data = responseData.data;
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
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error("Failed to commnicate with backend", err);
      }

      if (handleAuth && err.response?.status === 401) {
        // We need to get authorized.
        if (err.response?.headers.location) {
          // The server provided us with an authorization URL.
          window.location.assign(err.response.headers.location);
          return { rawResponse: err.response };
        } else {
          error = "errors.unauthorized";
        }
      } else if (err.response?.data) {
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
