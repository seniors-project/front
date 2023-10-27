export function objectToFormData(
  obj: any, // input에 obj가 들어가서 폼데이터가 나오는 함수
  form?: FormData,
  namespace?: string,
): FormData {
  const formData = form || new FormData();

  for (const property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      const formKey = namespace ? `${namespace}[${property}]` : property;

      if (obj[property] instanceof Date) {
        formData.append(formKey, obj[property].toISOString());
      } else if (
        typeof obj[property] === 'object' &&
        !(obj[property] instanceof File) &&
        obj[property] !== null
      ) {
        objectToFormData(obj[property], formData, formKey);
      } else if (Array.isArray(obj[property])) {
        for (let i = 0; i < obj[property].length; i++) {
          const arrayKey = `${formKey}[${i}]`;
          if (
            typeof obj[property][i] === 'object' &&
            !(obj[property][i] instanceof File)
          ) {
            objectToFormData(obj[property][i], formData, arrayKey);
          } else {
            formData.append(arrayKey, obj[property][i]);
          }
        }
      } else {
        formData.append(formKey, obj[property]);
      }
    }
  }

  return formData;
}
