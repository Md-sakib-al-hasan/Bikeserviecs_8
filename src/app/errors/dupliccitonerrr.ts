
export function getUniqueFieldsError(errorMessage: any): string[] {
    const fieldNames = [];
    const regex = /Unique constraint failed on the fields: \(`(.*?)`\)/;
    const match = errorMessage.match(regex);
    console.log('match', match);
    if (match && match[0]) {
      fieldNames.push(...match[0].split(',').map((field: string) => field.trim()));
    }
    
    return fieldNames;
  }
  