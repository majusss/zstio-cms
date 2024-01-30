import ImgurClient from "imgur";

const imgurClientSingleton = () => {
  return new ImgurClient({
  clientId: process.env.IMGUR_CLIENT_ID,
  clientSecret: process.env.IMGUR_CLIENT_SECRET,
});
};

declare global {
  var imgur: undefined | ReturnType<typeof imgurClientSingleton>;
}

const imgur = globalThis.imgur ?? imgurClientSingleton();

export default imgur;

if (process.env.NODE_ENV !== "production") globalThis.imgur = imgur;
