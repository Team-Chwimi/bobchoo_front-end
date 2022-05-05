declare module "google.maps";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}
