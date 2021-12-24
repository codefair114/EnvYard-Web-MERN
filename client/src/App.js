import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {dispatchLogin, fetchUser, dispatchGetUser} from './redux/actions/authAction'
import {Switch, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import axios from 'axios';
import { useState } from 'react';

/* Navbars and such */
import Navbar from './components/navbars/navbar.component';
import NavbarSupport from "./components/navbars/navbar-support.component"
import NavbarAdmin from "./components/navbars/navbar-admin.component";
import Backdrop from './components/backdrops/backdrop.component';
import Sidebar from './components/sidebars/sidebar.component';
/* Support Reviews */
import ReviewsList from "./components/reviews/reviews-list.component";
import EditReview from "./components/reviews/edit-review.component";
import CreateReview from "./components/reviews/create-review.component";
import QuestionList from './components/questions/questions-list.component';

/* Admin Users */
import CreateUser from "./components/users/create-user.component";
import UsersList from "./components/users/users-list.component";
import EditUser from './components/users/edit-user.component';
import RatingsPage from './components/charts/ratings.component';
import RevenuePage from './components/charts/revenue.chart.component';
import UsersPage from './components/charts/users.chart.component';

/* Customer Pages */
import Login from './components/body/auth/Login'
import Register from './components/body/auth/Register'
import ActivationEmail from './components/body/auth/ActivationEmail'
import NotFound from './components/utils/NotFound/NotFound'

import ForgotPass from './components/body/auth/ForgotPassword'
import ResetPass from './components/body/auth/ResetPassword'

import ParametersList from './components/charts/telemetry.component';
import GalleryPage from './components/pages/homepage/gallery.component';
import ImagePage from './components/pages/products/image-page.component';
import GardenPage from './components/pages/homepage/greenhouse.component';

import Profile from './components/body/profile/Profile'
import HomePage from './components/pages/homepage/homepage.component';
import RentingPage from './components/pages/homepage/renting.component';
import CartPage from './components/pages/cart/cartpage.component';
import ProductPage from './components/pages/products/product-page.component';
import ReviewsListCustomer from './components/pages/customer/reviews-list-customers.component';
import CreateQuestion from './components/questions/create-question.component';

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const {isLogged, isAdmin, isSupport } = auth
  const [sideToggle, setSideToggle] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])

 
  return (
    <Router>
      <Navbar click={() => setSideToggle(true)} />
      <Sidebar show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main>
      <Switch>

        {/* Support Routes */}
        <Route path="/support/reviews" exact component={isSupport ? ReviewsList: NotFound} />
        <Route path="/support/edit_review/:id" component={isSupport ?EditReview: NotFound} />
        <Route path="/support/questions" component={isSupport ?QuestionList: NotFound} />
        {/* Admin Routes */}
        <Route path="/create_user" component={isAdmin ? CreateUser: NotFound}/>
        <Route path="/admin/users" exact component={isAdmin ? UsersList: NotFound}/>
        <Route path="/admin/edit_user/:id" component={isAdmin ? EditUser : NotFound} />
        <Route path="/admin/ratings" component={isAdmin ? RatingsPage : NotFound}/>
        <Route path="/admin/orders" component={isAdmin ? RevenuePage : NotFound}/>
        <Route path="/admin/list" component={isAdmin ? UsersPage : NotFound}/>

        {/* Customer/User Routes */}
        <Route path="/" exact component={HomePage} />
        <Route path="/renting" component={RentingPage} />
        <Route path="/product/:id" component={ProductPage} />

        <Route path="/cart" component={CartPage} />
        <Route path="/reviews" component={ReviewsListCustomer} />
        <Route path="/create_review" component={CreateReview} />
        <Route path="/create_question" component={CreateQuestion} />
        <Route path="/telemetry/:gid" component={isLogged ? ParametersList : NotFound} />
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/gallery/:id" component={ImagePage} />

        <Route path="/gardens" component={isLogged ? GardenPage : NotFound} />

        <Route path="/login" component={isLogged ? NotFound : Login} exact />
        <Route path="/register" component={isLogged ? NotFound : Register} exact />

        <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPass} exact />
        <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />

        <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />

        <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
        </Switch>
        </main>
        
    </Router>
  );
}

export default App;
