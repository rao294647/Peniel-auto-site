export async function uploadToImgBB(file: File): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onload = async () => {
                const base64 = (reader.result as string).split(",")[1];

                const formData = new FormData();
                formData.append("image", base64);

                const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY!;
                if (!apiKey) return reject("Missing NEXT_PUBLIC_IMGBB_API_KEY");

                const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: "POST",
                    body: formData,
                });

                const json = await res.json();
                if (!json.success) return reject(json);

                resolve(json.data.url); // direct image URL
            };
            reader.onerror = () => reject("FileReader error");
            reader.readAsDataURL(file);
        } catch (err) {
            reject(err);
        }
    });
}
