import Cookies from "js-cookie";

export default async function checkLogin() {
  const res = await fetch(
    "https://movieflix-production.up.railway.app/api/v1/user/me",
    {
      headers:
        process.env.NODE_ENV === "development"
          ? {
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            }
          : {},
      method: "GET",
      cache: "no-cache",
      credentials: "include",
    }
  );
  if (!res.ok) console.log("Error checking user! Try again later");
  return res.json();
}