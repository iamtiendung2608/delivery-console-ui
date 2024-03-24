import {redirect} from "next/navigation";


export default function HomepageDashboard() {
    return (
        redirect("/home/order")
    );
}