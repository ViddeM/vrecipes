import axios, { AxiosResponse } from "axios";
import { ShortRecipe } from "./ListRecipe";

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

function getErrorString() {}
