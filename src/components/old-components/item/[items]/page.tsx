"use client";

type ItemProps = {
  params: {
    items: string;
  };
  searchParams: {
    [key: string]: string;
  };
  artCategories: any[];
};

const Items = (props: ItemProps) => {
  console.log("file: page.tsx:8  props", props);
  // const {
  //   params: { items },
  //   searchParams,
  //   artCategories,
  // } = props;
  // const theme = useMantineTheme();
  // const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  // const router = useRouter();
  // const span = mobile ? 12 : 6;

  // TODO: Need to call with API by Categories and Id
  // const categoiesItem = artCategories
  //   ?.filter((cat) => cat?.title === items)[0]
  //   .card_details?.filter(
  //     (item: any) => item.category === searchParams.category && item.id === +searchParams.id
  //   )[0];

  return <>Categories</>;

  // return (
  //   <Container fluid py={10}>
  //     <Grid justify="center" px={mobile ? rem(50) : rem(200)} py={rem(50)}>
  //       <Grid.Col
  //         span={span}
  //         style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  //       >
  //         <Image
  //           src={categoiesItem.image}
  //           alt="art"
  //           width={500}
  //           height={500}
  //           style={{
  //             objectFit: "cover",
  //             borderRadius: rem(20),
  //           }}
  //         />
  //       </Grid.Col>
  //       <Grid.Col
  //         span={span}
  //         style={{
  //           display: "flex",
  //           flexDirection: "column",
  //           alignItems: "flex-start",
  //           justifyContent: "flex-start",
  //           // backgroundColor: theme.colors.blue[3],
  //           gap: rem(20),
  //         }}
  //       >
  //         <Text c={theme.colors.blue[9]} ff={theme.fontFamily} fs={theme.fontSizes.xl} fw={800}>
  //           {categoiesItem?.category?.toUpperCase()}
  //         </Text>
  //         <Button
  //           radius={50}
  //           variant="outline"
  //           onClick={() => {
  //             router.push(ROUTES.CART.path);
  //           }}
  //         >
  //           {`${categoiesItem?.units}${categoiesItem?.price}`}
  //         </Button>
  //         <Text c={theme.colors.blue[9]} ff={theme.fontFamily} fs={theme.fontSizes.xl} fw={800}>
  //           {categoiesItem?.title}
  //         </Text>
  //         <Button
  //           variant={theme.colors?.blue[0]}
  //           color="dark"
  //           radius={50}
  //           onClick={() => {
  //             router.push(ROUTES.CART.path);
  //           }}
  //         >
  //           <IconGardenCart stroke={2} color={theme.colors.blue[0]} />
  //         </Button>
  //       </Grid.Col>
  //     </Grid>
  //     {artCategories?.map((catagoiesItem: any) => (
  //       <CategoiesSection categoryList={catagoiesItem} key={catagoiesItem.id} />
  //     ))}
  //   </Container>
  // );
};

export default Items;

// export const getServerSideProps = async () => {
//   const res = await API("/api/artworks");
//   console.log("file: page.tsx:103  getServerSideProps  res", res);
//   const data = (await res.json()) as any;
//   return { props: { artCategories: data } };
// };
