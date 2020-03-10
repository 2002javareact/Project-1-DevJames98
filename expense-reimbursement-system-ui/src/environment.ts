const devEnvironment = {
  ersBaseUrl: "http://localhost:2020"
};

const prodEnvironment = {
  ersBaseUrl: "http://ec2-18-224-18-65.us-east-2.compute.amazonaws.com:2020"
};

// export let environment = prodEnvironment;
export let environment = devEnvironment;

if (process.env.REACT_APP_ENV === "production") {
  environment = prodEnvironment;
}
