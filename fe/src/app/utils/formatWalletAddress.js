const formatWalletAddres = (address) => {
    if (!address || typeof address !== "string") return "—";
    if (address.length < 12) return address;
    const leftContent = address.slice(0, 10);
    const rightContent = address.slice(-4);
    return leftContent + "..." + rightContent;
}

export default formatWalletAddres;
