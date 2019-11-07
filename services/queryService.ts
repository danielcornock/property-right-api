class QueryService {
  constructor() {}

  public buildParamQuery(parameters: IParameters): IParameters {
    const query: IParameters = {};
    for (let [key, value] of Object.entries(parameters)) {
      query[key.replace('Id', '')] = value;
    }
    return query;
  }
}

export default new QueryService();

interface IParameters {
  [key: string]: string;
}
