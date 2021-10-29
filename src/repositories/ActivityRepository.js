import Repository, { baseUrl } from "./Repository";

class ActivityRepository {
  constructor(callback) {
    this.callback = callback;
  }

  async fetchActivityFeeds() {
    const endPoint = `activities`;
    try {
      const response = await Repository.get(`${baseUrl}${endPoint}`);
      return response;
    } catch (error) {}
  }

  async archiveCall(id, status) {
    const endPoint = `activities`;
    try {
      const response = await Repository.post(`${baseUrl}${endPoint}/${id}`, {
        is_archived: status,
      });
      return response;
    } catch (error) {}
  }

  async resetAllCalls() {
    const endPoint = `reset`;
    try {
      const response = await Repository.get(`${baseUrl}${endPoint}`);
      return response;
    } catch (error) {}
  }
}

export default new ActivityRepository();
