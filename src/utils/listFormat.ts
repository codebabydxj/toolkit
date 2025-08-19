/**
 * @description: 
 * @param {T[]} list
 * @param {string} id
 * @param {string} parentId
 * @return {T[]}
 */
export const listToTree = <T>(list: T[], id: string = "id", parentId: string = "parentId"): T[] => {
    let tree: T[] = [];
    tree = list.filter(
        (item1: T) =>
            !list.find((item2: T, index: number) => {
                // 如果有父节点
                if ((<any>item1)[parentId] === (<any>item2)[id]) {
                    // 放进它父节点的children数组中；如果children不存在，初始化为空数组
                    (<any>list[index]).children = (<any>list[index]).children || [];
                    (<any>list[index]).children.push(item1);
                }
                // find返回第一个符合条件的元素，找到后，剩余的元素不再判断
                return (<any>item1)[parentId] === (<any>item2)[id];
            })
    );
    return tree;
};

/**
 * @description: childrenName非必填
 * @param {T[]} tree
 * @param {string} childrenName
 * @return {T[]}
 */
export const treeToList = <T>(tree: T[], childrenName: string = 'children'): T[] => {
    const list: T[] = []
    const queue: T[] = [...tree]
    while (queue.length) {
        const node = queue.shift()
        if (node) {
            const children = (<any>node)[childrenName]
            if (children) queue.push(...children)
            list.push(node)
        }
    }
    for (let i = 0; i < list.length; i++) {
        if ((<any>list[i])[childrenName]) delete (<any>list[i])[childrenName]
    }
    return list
}