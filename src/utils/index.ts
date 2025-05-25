export function isSorted(arr: string[], option: "az" | "za"): boolean {
  for (let i = 1; i < arr.length; i++) {
    if(option === "az"){
        if (arr[i - 1].localeCompare(arr[i]) > 0) {
        return false;
        }
    }
    if(option === "za"){
        if (arr[i - 1].localeCompare(arr[i]) < 0) {
        return false;
        }
    }
  }
  return true;
}

export function isSortedNumbers(arr: number[], option: "hilo" | "lohi"): boolean {
  for (let i = 1; i < arr.length; i++) {
    if(option === "lohi"){
      if (arr[i - 1] > arr[i]) {
        return false;
      }
    }
    if(option === "hilo"){
      if (arr[i - 1] < arr[i]) {
        return false;
      }
    }

  }
  return true;
}