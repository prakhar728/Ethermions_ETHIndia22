import About from "../components/About";
import Community from "../components/Community";
import Featuring from "../components/Featuring";
import Layout from "../components/Layout";
// import Videobg from "../components/Videobg"
import HomeBg from "../components/HomeBg";

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
