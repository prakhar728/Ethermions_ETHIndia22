import Layout from "../components/Layout";
import HomeBg from "../components/HomeBg";
import Featuring from "../components/Featuring";
import Community from "../components/Community";

export default function Home() {
  return (
    <div>
      <Layout>
        <HomeBg />
        <Featuring />
        <Community />
      </Layout>
    </div>
  );
}
