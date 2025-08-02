export async function fetchUserData(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("User not found");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
