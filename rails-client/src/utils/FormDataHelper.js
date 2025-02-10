function isValidProperty(obj, propertyName) {
  return (
    Object.prototype.hasOwnProperty.call(obj, propertyName) &&
    obj[propertyName] !== undefined &&
    obj[propertyName] !== null
  );
}

function getFormKey(namespace, propertyName) {
  return namespace ? `${namespace}[${propertyName}]` : propertyName;
}

function appendAsDate(formData, formKey, value) {
  formData.append(formKey, value.toISOString());
}

function isObjectButNotFile(value) {
  return typeof value === "object" && !(value instanceof File);
}

function appendToFormData(formData, formKey, value) {
  if (value instanceof Date) {
    appendAsDate(formData, formKey, value);
  } else if (isObjectButNotFile(value)) {
    objectToFormData(value, formKey, formData);
  } else {
    formData.append(formKey, value);
  }
}

/** if you want to pass a post, the correct usage is to pass {post: {title: "foo", content: "bar"}}
 * @param obj The object that needs to be converted.
 * @param namespace If you pass this parameter, it will generate formKeys like namespace[propertyName], or just the propertyName if not given.*/
export function objectToFormData(
  obj,
  namespace = null,
  formData = new FormData()
) {
  for (let propertyName in obj) {
    if (isValidProperty(obj, propertyName)) {
      const formKey = getFormKey(namespace, propertyName);
      appendToFormData(formData, formKey, obj[propertyName]);
    }
  }
  return formData;
}

export function formDataToObject(formData) {
  const obj = {};
  for (let key of formData.keys()) {
    obj[key] = formData.get(key);
  }
  return obj;
}
