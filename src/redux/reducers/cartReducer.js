let defaultState = {
  selectedItems: { items: [] },
};

let cartReducer = (state = defaultState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "ADD_TO_CART": {
      if (action.payload.checkboxValue) {
        // xóa các thành phần đã trung lắp
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.foodId !== action.payload.foodId // loc ra tât cả cá iteam có giá trị khác
            ),
          ],
        };
        // them mới vào giỏ hàng
        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
        };
        console.log("ADD TO CART");
      } else {
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.foodId !== action.payload.foodId // loc ra tât cả cá iteam có giá trị khác
            ),
          ],
        };
        console.log("REMOVE FROM CART");
      }
      return newState;
    }

    case "REMOVE_FROM_CART": {
      newState.selectedItems = {
        items: [
          ...newState.selectedItems.items.filter(
            (item) => item.foodId !== action.payload.foodId
          ),
        ],
      };
      console.log("REMOVE FROM CART");
      return newState;
    }

    case "INCREASE_THE_NUMBER_OF_PRODUCTS": {
      for (let i = 0; i < newState.selectedItems.items.length; i++) {
        if (newState.selectedItems.items[i].foodId == action.payload.foodId)
          newState.selectedItems.items[i].quantity += 1;
      }
      newState.selectedItems = {
        items: [...newState.selectedItems.items],
      };
      console.log("INCREASE_THE_NUMBER_OF_PRODUCTS");
      return newState;
    }

    case "REDUCE_THE_NUMBER_OF_PRODUCTS": {
      for (let i = 0; i < newState.selectedItems.items.length; i++) {
        if (newState.selectedItems.items[i].foodId == action.payload.foodId) {
          if (newState.selectedItems.items[i].quantity > 1)
            newState.selectedItems.items[i].quantity -= 1;
          else alert("Số lượng sản phẩm phải lớn hơn 0");
        }
      }
      newState.selectedItems = {
        items: [...newState.selectedItems.items],
      };
      console.log("REDUCE_THE_NUMBER_OF_PRODUCTS");
      return newState;
    }

    case "RESET_DATA": {
      newState.selectedItems = {
        items: [],
      };
      console.log("RESET_DATA");
      return newState;
    }
    default:
      return state;
  }
};

export default cartReducer;
