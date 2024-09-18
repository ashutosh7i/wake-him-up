import { Client, Databases, Account, Query, ID } from "appwrite";

// Configuration object for Appwrite, ensuring all necessary environment variables are defined
export const config = {
    APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
    APPWRITE_DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
    APPWRITE_PAIRING_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_PAIRING_COLLECTION_ID,
};

// Create a new Appwrite client instance
const client = new Client();

// Validate that all required configuration values are present
if (!config.APPWRITE_ENDPOINT || !config.APPWRITE_PROJECT || !config.APPWRITE_DATABASE_ID || !config.APPWRITE_COLLECTION_ID) {
    throw new Error("Appwrite endpoint, project, database ID, and collection ID must be defined");
}

// Set the endpoint and project for the Appwrite client
client
    .setEndpoint(config.APPWRITE_ENDPOINT)
    .setProject(config.APPWRITE_PROJECT);

// Export instances of Account and Databases for use in other parts of the application
export const account = new Account(client);
export const database = new Databases(client);

// export const updateConnectionId = async (newConnectionId: string) => {
//     try {
//         // Fetch the current user's data
//         const userData = await account.get();
//         const email = userData.email;

//         console.log("User email:", email);

//         // Query the database to find the user's document ID based on their email
//         const userDocumentIdResponse = await database.listDocuments(
//             config.APPWRITE_DATABASE_ID as string,
//             config.APPWRITE_COLLECTION_ID as string,
//             [Query.equal("Email", email)]
//         );

//         // Ensure that a document was found
//         if (userDocumentIdResponse.documents.length === 0) {
//             // Create a new user document with the email and a random ID
//             const newUserDocument = await database.createDocument(
//                 config.APPWRITE_DATABASE_ID as string,
//                 config.APPWRITE_COLLECTION_ID as string,
//                 ID.unique(),
//                 { Email: email, ConnectionId: newConnectionId }
//             );
//             console.log("New user document created with ID:", newUserDocument.$id);
//             return; // Exit the function after creating the new document
//         }

//         const userDocumentId = userDocumentIdResponse.documents[0].$id;
//         console.log("User document ID:", userDocumentId);

//         // Update the connection ID in the user's document
//         await database.updateDocument(
//             config.APPWRITE_DATABASE_ID as string,
//             config.APPWRITE_COLLECTION_ID as string,
//             userDocumentId,
//             { ConnectionId: newConnectionId }
//         );

//     } catch (error) {
//         console.error("Failed to update connection ID:", error);
//     }
// };


export const updateConnectionId = async (newConnectionId: string) => {
    try {
      const userData = await account.get();
      const email = userData.email;
  
      const userDocumentResponse = await database.listDocuments(
        config.APPWRITE_DATABASE_ID as string,
        config.APPWRITE_COLLECTION_ID as string,
        [Query.equal("Email", email)]
      );
  
      if (userDocumentResponse.documents.length === 0) {
        await database.createDocument(
          config.APPWRITE_DATABASE_ID as string,
          config.APPWRITE_COLLECTION_ID as string,
          ID.unique(),
          { Email: email, ConnectionId: newConnectionId }
        );
      } else {
        const userDocument = userDocumentResponse.documents[0];
        await database.updateDocument(
          config.APPWRITE_DATABASE_ID as string,
          config.APPWRITE_COLLECTION_ID as string,
          userDocument.$id,
          { ConnectionId: newConnectionId }
        );
      } 
  
      return { success: true };
    } catch (error) {
      console.error("Failed to update connection ID:", error);
      return { success: false };
    }
  };

// Add this new function
export const logout = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.error("Failed to logout:", error);
    }
};
// ... (previous imports and configurations remain the same)

export const getPairStatus = async () => {
    try {
        const userData = await account.get();
        const email = userData.email;

        const pairResponse = await database.listDocuments(
            config.APPWRITE_DATABASE_ID as string,
            config.APPWRITE_PAIRING_COLLECTION_ID as string,
            [Query.equal("userEmail", email)]
        );

        if (pairResponse.documents.length === 0) {
            return { status: "unpaired" };
        }

        const pairDocument = pairResponse.documents[0];
        return {
            status: pairDocument.paired ? "paired" : "waiting",
            partnerEmail: pairDocument.partnerEmail,
            documentId: pairDocument.$id
        };
    } catch (error) {
        console.error("Failed to get pair status:", error);
        return { status: "error" };
    }
};

export const initiatePairing = async (partnerEmail: string) => {
    try {
        const userData = await account.get();
        const email = userData.email;

        // Check if user trying to pair with themself
        if (email === partnerEmail) {
            return { success: false, reason: "You cannot pair with yourself." };
        }

        // Check if the partner is already paired
        const partnerDocumentResponse = await database.listDocuments(
            config.APPWRITE_DATABASE_ID as string,
            config.APPWRITE_PAIRING_COLLECTION_ID as string,
            [Query.equal("userEmail", partnerEmail), Query.equal("paired", true)]
        );

        if (partnerDocumentResponse.documents.length > 0) {
            return { success: false, reason: "Partner is already paired with someone else." };
        }

        // Check if the current user is already paired
        const userDocumentResponse = await database.listDocuments(
            config.APPWRITE_DATABASE_ID as string,
            config.APPWRITE_PAIRING_COLLECTION_ID as string,
            [Query.equal("userEmail", email), Query.equal("paired", true)]
        );

        if (userDocumentResponse.documents.length > 0) {
            return { success: false, reason: "You are already paired with someone else." };
        }

        // If neither is paired, create a new pairing document
        const pairDocument = await database.createDocument(
            config.APPWRITE_DATABASE_ID as string,
            config.APPWRITE_PAIRING_COLLECTION_ID as string,
            ID.unique(),
            { userEmail: email, partnerEmail: partnerEmail, paired: false }
        );
        return { success: true, documentId: pairDocument.$id };
    } catch (error) {
        console.error("Failed to initiate pairing:", error);
        return { success: false, reason: "An error occurred while initiating pairing." };
    }
};

export const confirmPairing = async (partnerEmail: string) => {
    try {
        const userData = await account.get();
        const email = userData.email;

        const partnerDocumentResponse = await database.listDocuments(
            config.APPWRITE_DATABASE_ID as string,
            config.APPWRITE_PAIRING_COLLECTION_ID as string,
            [Query.equal("userEmail", partnerEmail), Query.equal("partnerEmail", email)]
        );

        if (partnerDocumentResponse.documents.length === 0) {
            return { success: false, reason: "No pairing request found" };
        }

        const partnerDocument = partnerDocumentResponse.documents[0];

        // Update partner's document
        await database.updateDocument(
            config.APPWRITE_DATABASE_ID as string,
            config.APPWRITE_PAIRING_COLLECTION_ID as string,
            partnerDocument.$id,
            { paired: true }
        );

        // Create or update current user's document
        const userDocumentResponse = await database.listDocuments(
            config.APPWRITE_DATABASE_ID as string,
            config.APPWRITE_PAIRING_COLLECTION_ID as string,
            [Query.equal("userEmail", email)]
        );

        let userDocumentId;
        if (userDocumentResponse.documents.length === 0) {
            const newUserDocument = await database.createDocument(
                config.APPWRITE_DATABASE_ID as string,
                config.APPWRITE_PAIRING_COLLECTION_ID as string,
                ID.unique(),
                { userEmail: email, partnerEmail: partnerEmail, paired: true }
            );
            userDocumentId = newUserDocument.$id;
        } else {
            const userDocument = userDocumentResponse.documents[0];
            await database.updateDocument(
                config.APPWRITE_DATABASE_ID as string,
                config.APPWRITE_PAIRING_COLLECTION_ID as string,
                userDocument.$id,
                { partnerEmail: partnerEmail, paired: true }
            );
            userDocumentId = userDocument.$id;
        }

        return { success: true, documentId: userDocumentId };
    } catch (error) {
        console.error("Failed to confirm pairing:", error);
        return { success: false, reason: "An error occurred" };
    }
};

export const breakupPairing = async () => {
    try {
        const userData = await account.get();
        const email = userData.email;

        const pairDocumentsResponse = await database.listDocuments(
            config.APPWRITE_DATABASE_ID as string,
            config.APPWRITE_PAIRING_COLLECTION_ID as string,
            [Query.equal("userEmail", email)]
        );

        for (const doc of pairDocumentsResponse.documents) {
            await database.deleteDocument(
                config.APPWRITE_DATABASE_ID as string,
                config.APPWRITE_PAIRING_COLLECTION_ID as string,
                doc.$id
            );
        }

        return { success: true };
    } catch (error) {
        console.error("Failed to breakup pairing:", error);
        return { success: false };
    }
};

export const getPartnerPeerId = async () => {
    try {
        console.log("Getting partner peer ID");
      const pairStatus = await getPairStatus();
      if (pairStatus.status === 'paired') {
        const partnerDoc = await database.listDocuments(
          config.APPWRITE_DATABASE_ID as string,
          config.APPWRITE_COLLECTION_ID as string,
          [Query.equal("Email", pairStatus.partnerEmail)]
        );
        if (partnerDoc.documents.length > 0) {
          return partnerDoc.documents[0].ConnectionId;
        }
      }
      return null;
    } catch (error) {
      console.error("Failed to get partner's peer ID:", error);
      return null;
    }
  };