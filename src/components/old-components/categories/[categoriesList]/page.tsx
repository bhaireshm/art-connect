"use client";

import { Box, rem } from "@mantine/core";

const CategoriesList = (props: any) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: { categoriesList },
  } = props;

  // TODO: Need to call with API by Categories
  // const categoiesItem = artCategories
  //   ?.filter((cat) => cat?.title === categoriesList)[0]
  //   .card_details?.map((item) => (
  //     <Box py={30} px={20} key={item?.id} w="20%">
  //       <Card {...item} toggleFavorite={() => {}} title={categoriesList} />
  //     </Box>
  //   ));

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: rem(20),
      }}
    >
      Item
    </Box>
  );
};

export default CategoriesList;
