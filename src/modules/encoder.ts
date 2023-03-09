const encoder = {
  text: {
    encode: (src: string): string => `"${src}"`,
    decode: (src: string): string => src.replace(/"|"/g, ""),
  },
  array: {
    decode: (src: string): any[] => {
      const result = src.replace(/{|}/g, "").split(", ");
      return result.map((d: string) => encoder.text.decode(d));
    },
    encode: (src: any[]): string => {
      const blocks = src.map((e: string) => encoder.text.encode(e)).join(", ");
      return `{${blocks}}`;
    },
  },
};

export default encoder;
