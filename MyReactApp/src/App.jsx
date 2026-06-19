import ArithmeticComponent from "./components/ArithmeticComponent";
import CreateNewPost from "./components/CreateNewPost";
import CreateProduct from "./components/CreateProduct";
import PostDetails from "./components/PostDetails";
import PostList from "./components/PostList";
import Products from "./components/Product";
import UserDetails from "./components/UserDetails";

function App() { //this is the parent component in react
  return ( // this return fn has to be in every component in react, it is used to return the JSX code 
    // <div>
    //   <h1>Hello React</h1>
    // </div>
    // <ArithmeticComponent />
    // <Products />
    // <CreateProduct  />
    // <PostList />
    // <UserDetails />
    // <PostDetails />
    <CreateNewPost  />
  );

}
export default App; // this is used to export the component so that it can be used in other files
// jsx is javascript extension,  HTML + CSS + JS