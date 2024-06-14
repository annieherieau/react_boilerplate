const api_url = import.meta.env.VITE_BACK_API_URL;

const endpoints = {
  // USERS ENDPOINTS
  sign_up: {
    method: "POST",
    url: api_url + "/{ressource}",
  },
  sign_in: {
    method: "POST",
    url: api_url + "/{ressource}/sign_in",
  },
  sign_out: {
    method: "DELETE",
    url: api_url + "/{ressource}/sign_out",
  },
  forgot_password: {
    method: "POST",
    url: api_url + "/{ressource}/password",
  },
  reset_password: {
    method: "PUT",
    url: api_url + "/{ressource}/password",
  },
  profile: {
    method: "GET",
    url: api_url + "/profile",
  },
  update_user: {
    method: "PUT",
    url: api_url + "/{ressource}",
  },
  // RESSOURCES ENDPOINTS
  index: {
    method: "GET",
    url: api_url + "/{ressource}",
  },
  create: {
    method: "POST",
    url: api_url + "/{ressource}",
  },
  show: {
    method: "GET",
    url: api_url + "/{ressource}/{:id}",
  },
  update: {
    method: "PUT",
    url: api_url + "/{ressource}/{:id}",
  },
  delete: {
    method: "DELETE",
    url: api_url + "/{ressource}/{:id}",
  },
  // CUSTOM ENDPOINTS
};

// création es paramètres de la requete: options et url
export function buildRequestOptions(
  ressource,
  endpoint,
  data = { id: null, body: null, token: null, isFormData: false }
) {
  const { id, body, token, isFormData } = data;
  const { method, url } = endpoints[endpoint];
  let requestUrl = url.replace("{ressource}", ressource);
  requestUrl = id ? requestUrl.replace("{:id}", id) : requestUrl;

  const options = {
    method: method,
    headers: {},
  };

  if (isFormData) {
    options.body = body;
  } else if (body) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return { url: requestUrl, options: options };
}

export function getTokenFromResponse(response) {
  const token = response.headers.get("authorization").split(" ")[1];
  console.log(token);
  return token
}
