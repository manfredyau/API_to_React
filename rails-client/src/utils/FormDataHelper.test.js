import { formDataToObject, objectToFormData } from "./FormDataHelper.js";
import { describe, expect, it } from "@jest/globals";

describe("FormDataHelper", () => {
  it("should convert FormData to object", () => {
    const formData = new FormData();
    formData.append("name", "John");
    formData.append("age", "30");

    const obj = formDataToObject(formData);
    expect(obj).toEqual({ name: "John", age: "30" });
  });

  it("should convert object to FormData", () => {
    const obj = { name: "John", age: "30" };
    const formData = objectToFormData(obj);
    expect(formData.get("name")).toBe("John");
    expect(formData.get("age")).toBe("30");
  });

  it("should convert date to string in FormData", () => {
    const obj = {
      post: {
        title: "My Post",
        body: "This is my post",
        created_at: new Date(),
      },
    };
    const formData = objectToFormData(obj);
    expect(formData.get("post[title]")).toBe("My Post");
    expect(formData.get("post[body]")).toBe("This is my post");
    expect(formData.get("post[created_at]")).toEqual(
      obj.post.created_at.toISOString()
    );
  });

  it("should convert nested object to FormData", () => {
    const obj = {
      nested_object: {
        name: "John",
        age: "30",
      },
    };

    const formData = objectToFormData(obj);
    expect(formData.get("nested_object[name]")).toBe("John");
    expect(formData.get("nested_object[age]")).toBe("30");
  });
});
