import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: '20m', target: 10 }, // simulate ramp-up of traffic from 1 to 100 users over 10 minutes.
    { duration: '30m', target: 10 }, // stay at 100 users for 30 minutes
    { duration: '10m', target: 50 }, // ramp-up to 200 users over 10 minutes (peak hour starts)
    { duration: '30m', target: 50 }, // stay at 200 users for 30 minutes
    { duration: '10s', target: 100 }, //ramp up to 300 users for 10 minutes
    { duration: '30m', target: 100 },	// stay at 300 users for 30 minutes
    { duration: "10m", target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_failed: [{
      threshold: 'rate<=0.05',
      abortOnFail: true,
    }],
    http_req_duration: ['p(95)<=100'],
    checks: ['rate>=0.99'],
},
};
//abourts the test if the error rate goes about 5%
//abourts the test if the 95 percentile of the request goes above 100ms

export default function () {
  let url = "https://httpbin.test.k6.io/post";
  let response = http.post(url, "Hello world!");
  check(response, {
    "Application says hello": (r) => r.body.includes("Hello world!"),
  });

  sleep(Math.random() * 5);
}
//k6 cloud test-with-stages.js
