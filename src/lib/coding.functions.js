import { createServerFn } from "@tanstack/react-start";
import { fetchGfg, fetchGitHub, fetchLeetCode } from "./coding.server.js";

export const getCodingStats = createServerFn({ method: "GET" }).handler(async () => {
  const [leetcode, github, gfg] = await Promise.all([
    fetchLeetCode("vikash_divya"),
    fetchGitHub("divyavikash620"),
    fetchGfg("divyavik48hv"),
  ]);
  return { leetcode, github, gfg, fetchedAt: new Date().toISOString() };
});
