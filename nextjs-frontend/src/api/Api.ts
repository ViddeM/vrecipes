import axios, { AxiosResponse } from "axios";
import { ShortRecipe } from "./ShortRecipe";
import { Recipe } from "./Recipe";
import { IMAGE_BASE_ENDPOINT } from "./Endpoints";
import { Me } from "./Me";

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
        axios.get<RawApiResponse<{ recipes: ShortRecipe[] }>>("/recipes")
      );
    },
    getOne: (unique_name: string) => {
      return handleResponse(
        axios.get<RawApiResponse<Recipe>>(`/recipes/${unique_name}`)
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
      return handleResponse(axios.get<RawApiResponse<Me>>("/me"));
    },
  },
  images: {
    formatImageUrl: (imageUrl: string): string => {
      return `${IMAGE_BASE_ENDPOINT}/${imageUrl}`;
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
  handleAuth?: boolean
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
          error: true,
          errorTranslationString: `errors.${error}`,
          rawResponse: responseData,
        };
      }

      return {
        data: data.data,
        rawResponse: responseData,
      };
    })
    .catch((err) => {
      if (handleAuth) {
        if (
          err.response &&
          err.response.status === 401 &&
          err.response.headers &&
          err.response.headers.location
        ) {
          window.location.assign(err.response.headers.location);
          return { rawResponse: err.response };
        } else {
          console.log("NO LOCATION!", err);
        }
      }

      return {
        error: true,
        errorTranslationString: "errors.default",
        rawResponse: err.response,
      };
    });
}
