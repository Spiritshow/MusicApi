

const ParsedValue = (rawValue: string): string | number => {
  return /^\d+(\.\d+)?$/.test(rawValue) ? Number(rawValue) : rawValue;
};

export default ParsedValue;