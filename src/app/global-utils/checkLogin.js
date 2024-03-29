import Cookies from "js-cookie";

export default async function checkLogin() {
  try {
    const res = await fetch(
      "https://movieflix-ljqx.onrender.com/api/v1/user/me",
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
  } catch (err) {
    alert(err);
  }
}
