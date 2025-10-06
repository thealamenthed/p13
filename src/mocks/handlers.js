import {http, HttpResponse} from "msw";
const API = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
let profile = {id: "u_1", email: "tony@stark.com", firstName: "Tony", lastName: "Javis"};
export const handlers = [
  http.post(`${API}/user/login`, async ({request}) => {
    const body = await request.json();
    if (body.email && body.password) return HttpResponse.json({token: "mock-jwt-token"});
    return HttpResponse.json({message: "Invalid credentials"}, {status: 400});
  }),
  http.post(`${API}/user/profile`, async ({request}) => {
    const auth = request.headers.get("authorization");
    if (!auth) return HttpResponse.json({message: "Unauthorized"}, {status: 401});
    return HttpResponse.json(profile);
  }),
  http.put(`${API}/user/profile`, async ({request}) => {
    const auth = request.headers.get("authorization");
    if (!auth) return HttpResponse.json({message: "Unauthorized"}, {status: 401});
    const body = await request.json();
    profile = {...profile, ...body};
    return HttpResponse.json(profile);
  })
];
