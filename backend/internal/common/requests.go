package common

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

func GetRequest(url string, headers map[string]string, writeTo interface{}) (*http.Response, error) {
	client := &http.Client{}
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}

	for key, val := range headers {
		req.Header.Set(key, val)
	}

	response, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}

	err = json.Unmarshal(data, writeTo)
	if err != nil {
		return nil, err
	}

	return response, nil
}

