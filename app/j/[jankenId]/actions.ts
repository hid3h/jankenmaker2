"use server";

export const playJanken = async (prevData: any, formData: FormData) => {
  const hand = formData.get("hand");
  // 3秒待つ
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("formData", formData);

  return {
    text: "Please enter a valid email",
    imagePath: "/TODO",
    message: "example",
    twitterShareUrl: "https://twitter.com/intent/tweet?text=example",
  };
};
