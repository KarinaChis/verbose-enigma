import { PropsWithChildren, useEffect, useState } from "react";
import { Text, View } from "react-native";

export const CustomText = ({ children }: PropsWithChildren) => (
  <Text>{children}</Text>
);

type User = {
  id: KeyType;
  username: String;
};

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error:", error));
  }, []);

  if (users?.length === 0) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      {users?.map((user) => (
        <Text key={user.id}>{user.username}</Text>
      ))}
    </View>
  );
}
