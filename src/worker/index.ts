import { Hono } from "hono";
import { BlankSchema } from "hono/types";
const app = new Hono<{ Bindings: Env }>();

const apiApp = new Hono<{ Bindings: Env }, BlankSchema, "/api">();

apiApp.get("/", (ctx) => {
    return ctx.json({ "api": true })
})


app.route("/api", apiApp);
export default app;
