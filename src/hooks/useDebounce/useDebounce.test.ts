import { debounce } from "./useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should call the function after the specified delay", () => {
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction, 500);

    debouncedFunction();
    expect(mockFunction).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("should call the function only once if invoked multiple times within delay", () => {
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction, 500);

    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    expect(mockFunction).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("should reset the timer if invoked again before delay", () => {
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction, 500);

    debouncedFunction();
    jest.advanceTimersByTime(300);
    debouncedFunction();
    jest.advanceTimersByTime(300);

    expect(mockFunction).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);
    expect(mockFunction).toHaveBeenCalled();
  });

  it("should pass the correct arguments to the debounced function", () => {
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction, 500);

    debouncedFunction("hello", 42);
    jest.advanceTimersByTime(500);

    expect(mockFunction).toHaveBeenCalledWith("hello", 42);
  });
});
