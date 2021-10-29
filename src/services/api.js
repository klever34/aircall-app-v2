import ActivityRepository from "../repositories/ActivityRepository";

export async function getFeeds() {
  try {
    const response = await ActivityRepository.fetchActivityFeeds();
    return response.data;
  } catch (error) {}
}

export async function setAsArchive(id) {
  try {
    const response = await ActivityRepository.archiveCall(id, true);
    return response;
  } catch (error) {}
}

export async function resetCalls() {
  try {
    const response = await ActivityRepository.resetAllCalls();
    return response;
  } catch (error) {}
}

export async function setUndoArchive(id) {
  try {
    const response = await ActivityRepository.archiveCall(id, false);
    return response;
  } catch (error) {}
}
