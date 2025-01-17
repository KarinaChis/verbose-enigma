import { PropsWithChildren, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  const [result] = useQuery({ query: PostsQuery });
  const { data, fetching, error } = result;

  if (fetching) {
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
    <SafeAreaView>
      <FlatList
        data={data.posts.data}
        renderItem={({ item: post }) => {
          return (
            <View key={post.id} style={styles.post}>
              <Text>{post.id}</Text>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Button color="red" title="Remove" />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  post: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    margin: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#eee",
    borderColor: "grey",
    borderRadius: 5,
    gap: 8,
  },
  postTitle: {
    flex: 1,
  },
});
