import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: '10m', target: 100 },
    { duration: '30m', target: 100 },
    { duration: '10m', target: 200 },
    { duration: '30m', target: 200 },
    { duration: '10m', target: 300 },
    { duration: '30m', target: 300 },	  
  ],
};

export default function () {
  let url = "https://httpbin.test.k6.io/post";
  let response = http.post(url, "Hello world!");
  check(response, {
    "Application says hello": (r) => r.body.includes("Hello world!"),
  });

  sleep(Math.random() * 5);
}
