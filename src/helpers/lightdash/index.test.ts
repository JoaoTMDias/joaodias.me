import { get } from "./get";
import { split } from "./split";
import { isNil } from "./is-nil";

describe("get()", () => {
	const simpleObject = { a: { b: 2 } };
	const complexObject = { a: [{ b: { c: 3 } }] };
	const expected = {
		simpleObject: 2,
		complexObject: 3,
		simpleDefault: "default",
		complexDefault: "default",
		falseCase: undefined,
	};

	it("get - simple path string", () => {
		expect(get(simpleObject, "a.b")).toEqual(expected.simpleObject);
	});

	it("get - complex path string", () => {
		expect(get(complexObject, "a[0].b.c")).toEqual(expected.complexObject);
	});

	it("get - complex path array", () => {
		expect(get(complexObject, ["a", "0", "b", "c"])).toEqual(expected.complexObject);
	});

	it("get - simple default value if not path not found", () => {
		expect(get(simpleObject, "a.b.c", "default")).toEqual(expected.simpleDefault);
	});

	it("get - complex default value if not path not found", () => {
		expect(get(complexObject, "a.b.c", "default")).toEqual(expected.complexDefault);
	});
	it("get - should return undefined", () => {
		expect(get(complexObject, null)).toBeUndefined();
	});
});

describe("split", () => {
	const separator = "-";
	const all = "a-b-c";
	const limit = 2;
	const expected = {
		all: ["a", "b", "c"],
		justTwo: ["a", "b"],
	};

	it("should return an array with all letter split", () => {
		expect(split(all, separator)).toEqual(expected.all);
	});

	it("should return just the first two l", () => {
		expect(split(all, separator, limit)).toEqual(expected.justTwo);
	});
});

describe("isNil", () => {
	const expected = {
		toBeNull: true,
		toBeUndefined: true,
		toBeNaN: false,
	};

	it("toBeNull", () => {
		expect(isNil(null)).toEqual(expected.toBeNull);
	});

	it("toBeUndefined", () => {
		expect(isNil(undefined)).toEqual(expected.toBeUndefined);
	});

	it("toBeNaN", () => {
		expect(isNil(NaN)).toEqual(expected.toBeNaN);
	});
});
