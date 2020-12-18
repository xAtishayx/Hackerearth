import React, { Component } from "react";
import { DataContext } from "../Context";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "../css/Card.css";
import "../css/Cart.css";
import "react-notifications/lib/notifications.css";
export class Cart extends Component {
  static contextType = DataContext;
  state = { alert: false };
  createNotification = (type, title) => {
    return () => {
      switch (type) {
        case "info":
          NotificationManager.info("Info message");
          break;
        case "success":
          NotificationManager.success(
            title + " has been deleted successfully",
            "Delete",
            1000
          );
          break;
        case "warning":
          NotificationManager.warning(
            "Warning message",
            "Close after 3000ms",
            3000
          );
          break;
        case "error":
          NotificationManager.error("Error message", "Click me!", 5000, () => {
            alert("callback");
          });
          break;
      }
    };
  };
  componentDidMount() {
    this.context.getTotal();
  }

  render() {
    const {
      cart,
      increase,
      reduction,
      removeProduct,
      total,
      totalcount,
      totaldiscount,
      totaltypediscount,
    } = this.context;
    if (cart.length === 0) {
      return (
        <>
          <h2 style={{ textAlign: "center" }}>Cart is empty</h2>
            <br/> <br/>
          <div
            className="amount"
            style={{textAlign: "center"}}
          >
              <center>
            <button
              className="count"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              style={{display:"flex", width:270, backgroundColor:" rgb(255, 238, 238)"}}
            >
               <h1 style={{ textAlign: "center" }}>Click to Reload Items</h1>
            </button>
            </center>
          </div>
        </>
      );
    } else {
      return (
        <div className="flex">
          <div
            style={{
              marginLeft: 25,
              color: "#565656",
              fontSize: "2em",
              fontFamily: "roboto",
            }}
          >
            {" "}
            {"<"} Order Summary{" "}
          </div>
          <div className="main">
            <table className="content-table">
              <thead>
                <tr>
                  <th>Items({totalcount})</th>
                  <th></th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="start">
                        <img
                          src={item.src}
                          alt=""
                          style={{ height: 40, width: 40 }}
                        />
                        <p>{item.title}</p>
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div
                        className="amount"
                        onClick={() => {
                          removeProduct(item._id);
                          this.setState({ alert: true });
                        }}
                      >
                        <button
                          className="count"
                          onClick={this.createNotification(
                            "success",
                            item.title
                          )}
                        >
                          X
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="amount">
                        <button
                          className="count"
                          onClick={() => reduction(item._id)}
                        >
                          {" "}
                          -{" "}
                        </button>
                        <span>{item.count}</span>
                        <button
                          className="count"
                          onClick={() => increase(item._id)}
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                    </td>
                    <td>
                      {" "}
                      <span>${item.price * item.count}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="card rounded mb-3 ">
              <div className=" card-body p-5  justify-content-between">
                <div className="content">
                  <h3>Total</h3>
                  {/* <span>${product.price}</span>
                               <p>{product.description}</p> */}
                  <div className="row">
                    <div>Items ({totalcount}) </div>
                    <div>: ${total.toFixed(2)}</div>
                  </div>
                  <div className="row">
                    <div>Discount </div>
                    <div>: - ${totaldiscount.toFixed(2)}</div>
                  </div>
                  <div className="row">
                    <div>Type Discount </div>
                    <div>: - ${totaltypediscount.toFixed(2)}</div>
                  </div>
                  <div className="row2">
                    <div>Order Total </div>
                    <div>
                      : $
                      {(total - totaldiscount - totaltypediscount).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <NotificationContainer />
        </div>
      );
    }
  }
}

export default Cart;
