const limitWords = (html = "", limit = 500) => {
   const text = html.replace(/<[^>]*>/g, ""); // remove HTML tags

  if (text.length <= limit) return text;

  return text.slice(0, limit) + "...";
};
export default limitWords;