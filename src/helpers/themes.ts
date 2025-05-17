export const themes = {
  blue: {
    name: "",
    color: "#BFD6EA",
    accentColor: "#9FB7CE",
    heroImg: "/image/blue.jpg",
    heroImg2x: "/image/blue@2x.jpg",
  },
  orange: {
    name: "orange",
    color: "#F4C8BA",
    accentColor: "#F0AA8D",
    heroImg: "/image/orange.jpg",
    heroImg2x: "/image/orange@2x.jpg",
  },
  green: {
    name: "green",
    color: "#CBDED3",
    accentColor: "#9FBAAE",
    heroImg: "/image/green.jpg",
    heroImg2x: "/image/green@2x.jpg",
  },
  red: {
    name: "red",
    color: "#F2C0BD",
    accentColor: "#E0A39A",
    heroImg: "/image/red.jpg",
    heroImg2x: "/image/red@2x.jpg",
  },
  yellow: {
    name: "yellow",
    color: "#FBE9BA",
    accentColor: "#F4C550",
    heroImg: "/image/yellow.jpg",
    heroImg2x: "/image/yellow@2x.jpg",
  },
} as const;

export type ThemeName = keyof typeof themes;
