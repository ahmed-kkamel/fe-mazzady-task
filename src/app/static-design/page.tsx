import { Header } from "@/components/static-design/Header";
import UserLanding from "@/components/static-design/UserLanding";
export default function StaticPage() {
    return (
        <div className="container mx-auto">
            <Header />
            <UserLanding />
        </div>
    );
}
