import { PropsWithChildren, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { gql, useQuery } from "urql";

export const CustomText = ({ children }: PropsWithChildren) => (
  <Text>{children}</Text>
);

type User = {
  id: KeyType;
  username: String;
};

const PostsQuery = gql`
  query PostsQuery {
    posts {
      data {
        id
        title
      }
    }
  }
`;

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);

  const [result] = useQuery({ query: PostsQuery });
  const { data, fetching, error } = result;

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error:", error));
  }, []);

  if (users?.length === 0 || fetching) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error)
    return (
      <View>
        <Text>Oh no... {error.message}</Text>
      </View>
    );

  return (
    <View>
      {users.splice(0, 10).map((user) => (
        <Text key={user.id + 1}>{user.username}</Text>
      ))}
      {data.posts.data.splice(0, 10).map((post) => (
        <Text key={post.id}>{post.title}</Text>
      ))}
    </View>
  );
}
