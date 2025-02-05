import { PropsWithChildren } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { gql, useMutation, useQuery } from "urql";

export const CustomText = ({ children }: PropsWithChildren) => (
  <Text>{children}</Text>
);

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

const DeletePost = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export default function HomeScreen() {
  const [result] = useQuery({ query: PostsQuery });
  const { data, fetching, error } = result;
  const [, deletePost] = useMutation(DeletePost);

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
            <View key={post.id} style={styles.post} testID={`post_${post.id}`}>
              <Text>{post.id}</Text>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Button
                color="red"
                onPress={() => {
                  deletePost({ id: post.id });
                }}
                title="Remove"
                testID={`post_${post.id}_button`}
              />
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
