import axios, {AxiosResponse} from "axios";
import {ShortRecipe} from "./ShortRecipe";
import {Recipe} from "./Recipe";

// FIXME: should be changed before prod...
axios.defaults.baseURL = "http://localhost:3000/api";
const IMAGE_BASE_URL = "/api/images";

interface RawApiResponse<ResponseData> {
  success: boolean;
  error: string | null;
  data: ResponseData | null;
}

export const Api = {
  recipes: {
    getAll: () => {
      return handleResponse(
        axios.get<RawApiResponse<{ recipes: ShortRecipe[] }>>("/recipes")
      );
    },
    getOne: (unique_name: string) => {
      return handleResponse(
        axios.get<RawApiResponse<Recipe>>(`/recipes/${unique_name}`)
      );
    },
  },
  login: {
    github: () => {
      return handleResponse(axios.get("/auth/github"));
    },
  },
  images: {
    formatImageUrl: (imageUrl: string): string => {
      return `${IMAGE_BASE_URL}/${imageUrl}`;
    },
  },
};

export interface ApiResponse<T> {
  errorTranslationString?: string;
  data?: T;
}

function handleResponse<T>(
  response: Promise<AxiosResponse<RawApiResponse<T>, any>>
): Promise<ApiResponse<T>> {
  return response
    .then((responseData) => {
      let data = responseData.data;
      if (!data.success || data.error || !data.data) {
        let error = data.error;
        if (!error) {
          error = "unknown";
        }

        return {
          errorTranslationString: `errors.${error}`,
        };
      }

      return {
        data: data.data,
      };
    })
    .catch((error) => {
      console.log("ERROR: ", error);
      return {
        errorTranslationString: "errors.default",
      };
    });
}

function authorizedApiCall<T>(
  response: Promise<AxiosResponse<RawApiResponse<T>>>
): Promise<AxiosResponse<RawApiResponse<T>>> {
  return response.then((responseInfo) => {
    if (responseInfo.headers["location"]) {
      window.location.href = responseInfo.headers["location"];
    }

    // TODO: Finish
    return response;
  });
}

function getErrorString() {}
