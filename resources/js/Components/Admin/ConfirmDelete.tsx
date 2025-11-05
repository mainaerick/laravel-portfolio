import Swal from "sweetalert2";
import { router } from "@inertiajs/react";

/**
 * Reusable SweetAlert-based delete confirmation helper
 * @param routeName The named Laravel route (e.g. "admin.tags.destroy")
 * @param id The model's ID
 * @param modelName The human-readable model name (e.g. "Tag")
 * @param options Optional overrides for Swal or Inertia router
 */
export const confirmDelete = (
    routeName: string,
    id: number | string,
    modelName: string,
    options?: {
        routeParams?: Record<string, any>;
        onSuccess?: () => void;
        onError?: (errors: any) => void;
    }
) => {
    Swal.fire({
        title: `Do you want to delete this ${modelName}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#e3342f",
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(
                route(routeName, options?.routeParams ?? id),
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: `${modelName} deleted successfully!`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        options?.onSuccess?.();
                    },
                    onError: (errors) => {
                        console.error(`Delete failed for ${modelName}:`, errors);
                        Swal.fire({
                            icon: "error",
                            title: "Delete failed!",
                            text: `Could not delete the ${modelName}.`,
                            showConfirmButton: true,
                        });
                        options?.onError?.(errors);
                    },
                }
            );
        }
    });
};
