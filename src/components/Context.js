import React, { Component } from "react";

export const DataContext = React.createContext();

export class DataProvider extends Component {
  state = {
    cart: [
      {
        _id: 9090,
        title: "Item1",
        price: 200,
        discount: 10,
        count: 1,
        type: "fiction",
        src: "https://place-hold.it/40.jpg",
      },
      {
        _id: 9091,
        title: "Item2",
        price: 250,
        discount: 15,
        count: 1,
        type: "literature",
        src: "https://place-hold.it/40.jpg",
      },
      {
        _id: 9092,
        title: "Item3",
        price: 320,
        discount: 5,
        count: 1,
        type: "literature",
        src: "https://place-hold.it/40.jpg",
      },
      {
        _id: 9093,
        title: "Item4",
        price: 290,
        discount: 0,
        count: 1,
        type: "thriller",
        src: "https://place-hold.it/40.jpg",
      },
      {
        _id: 9094,
        title: "Item5",
        price: 500,
        discount: 25,
        count: 1,
        type: "thriller",
        src: "https://place-hold.it/40.jpg",
      },
      {
        _id: 9095,
        title: "Item6",
        price: 150,
        discount: 5,
        count: 1,
        type: "literature",
        src: "https://place-hold.it/40.jpg",
      },
      {
        _id: 9096,
        title: "Item7",
        price: 700,
        discount: 22,
        count: 1,
        type: "literature",
        src: "https://place-hold.it/40.jpg",
      },
      {
        _id: 9097,
        title: "Item8",
        price: 350,
        discount: 18,
        count: 1,
        type: "fiction",
        src: "https://place-hold.it/40.jpg",
      },
    ],
    total: 0,
    totaldiscount: 0,
    totaltypediscount: 0,
    totalcount: 0,
  };

  reduction = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item._id === id) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
    this.getCount();
    this.getDiscount();
    this.getTypeDiscount();
  };

  increase = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item._id === id) {
        item.count += 1;
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
    this.getCount();
    this.getDiscount();
    this.getTypeDiscount();
  };

  removeProduct = (id) => {
    // if (window.confirm("Do you want to delete this product?")) {
      const { cart } = this.state;
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      this.setState({ cart: cart });
      this.getTotal();
      this.getCount();
      this.getDiscount();
      this.getTypeDiscount();
    // }
  };

  getTotal = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
      return prev + item.price * item.count;
    }, 0);
    this.setState({ total: res });
  };
  getDiscount = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
      return prev + item.discount * item.count;
    }, 0);
    this.setState({ totaldiscount: res });
  };
  getTypeDiscount = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
      if (item.type === "fiction") {
        prev =  prev + (0.15 * item.price * item.count);
      }
      return prev;
    }, 0);
    this.setState({ totaltypediscount: res });
  };
  getCount = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
      return prev + item.count;
    }, 0);
    this.setState({ totalcount: res });
  };

  componentDidUpdate() {
    localStorage.setItem("dataCart", JSON.stringify(this.state.cart));
    localStorage.setItem("dataTotal", JSON.stringify(this.state.total));
    localStorage.setItem(
      "dataTotalCount",
      JSON.stringify(this.state.totalcount)
    );
    localStorage.setItem(
      "dataTotalDiscount",
      JSON.stringify(this.state.totaldiscount)
    );
    localStorage.setItem(
      "dataTotalTypedDiscount",
      JSON.stringify(this.state.totaltypediscount)
    );
  }

  componentDidMount() {
    const reload = this.state.cart;
    console.log(reload);
    this.getTotal();
    this.getCount();
    this.getDiscount();
    this.getTypeDiscount();
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    if (dataCart !== null) {
      this.setState({ cart: dataCart });
    }
    const dataTotal = JSON.parse(localStorage.getItem("dataTotal"));
    if (dataTotal !== null) {
      this.setState({ total: dataTotal });
    }
    const dataTotalCount = JSON.parse(localStorage.getItem("dataTotalCount"));
    if (dataTotalCount !== null) {
      this.setState({ totalcount: dataTotalCount });
    }
    const dataTotalDiscount = JSON.parse(
      localStorage.getItem("dataTotalDiscount")
    );
    if (dataTotalDiscount !== null) {
      this.setState({ totaldiscount: dataTotalDiscount });
    }
    const dataTotalTypedDiscount = JSON.parse(
      localStorage.getItem("dataTotalTypedDiscount")
    );
    if (dataTotalTypedDiscount !== null) {
      this.setState({ totaltypediscount: dataTotalTypedDiscount });
    }
  }

  render() {
    const {
      cart,
      total,
      totalcount,
      totaldiscount,
      totaltypediscount
    } = this.state;
    const {
      addCart,
      reduction,
      increase,
      removeProduct,
      getTotal,
      getCount,
      getDiscount,
      getTypeDiscount,
    } = this;
    // const cart2 = cart
    return (
      <DataContext.Provider
        value={{
          cart,
          reduction,
          increase,
          removeProduct,
          total,
          getTotal,
          totaldiscount,
          getDiscount,
          totaltypediscount,
          getTypeDiscount,
          totalcount,
          getCount,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
